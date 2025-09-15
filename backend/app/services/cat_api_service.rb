class CatApiService # rubocop:disable Metrics/ClassLength
  include HTTParty
  base_uri 'https://api.thecatapi.com/v1'

  def self.api_key
    ENV['CAT_API_KEY']
  end

  def self.headers
    {
      'x-api-key' => api_key,
      'Content-Type' => 'application/json'
    }
  end

  def self.sync_all_breeds # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
    # 1. Dohvati sve breeds iz Cat API
    breeds_data = fetch_breeds_from_api
    synced_count = 0

    # 2. Za svaki breed dohvati jednu sample sliku
    breeds_data.each do |breed_data| # rubocop:disable Metrics/BlockLength
      breed = Breed.find_or_initialize_by(cat_api_id: breed_data['id'])

      breed.assign_attributes(
        breed_name: breed_data['name'],
        description: breed_data['description'],
        temperament: breed_data['temperament'],
        origin: breed_data['origin'],
        life_span: breed_data['life_span'],
        wikipedia_url: breed_data['wikipedia_url'],
        # Dodaj nove atribute
        alt_names: breed_data['alt_names'],
        adaptability: breed_data['adaptability'],
        affection_level: breed_data['affection_level'],
        child_friendly: breed_data['child_friendly'],
        dog_friendly: breed_data['dog_friendly'],
        energy_level: breed_data['energy_level'],
        grooming: breed_data['grooming'],
        health_issues: breed_data['health_issues'],
        intelligence: breed_data['intelligence'],
        shedding_level: breed_data['shedding_level'],
        social_needs: breed_data['social_needs'],
        stranger_friendly: breed_data['stranger_friendly'],
        vocalisation: breed_data['vocalisation'],
        # Boolean atributi
        indoor: breed_data['indoor'] == 1,
        lap: breed_data['lap'] == 1,
        experimental: breed_data['experimental'] == 1,
        hairless: breed_data['hairless'] == 1,
        natural: breed_data['natural'] == 1,
        rare: breed_data['rare'] == 1,
        rex: breed_data['rex'] == 1,
        suppressed_tail: breed_data['suppressed_tail'] == 1,
        short_legs: breed_data['short_legs'] == 1,
        hypoallergenic: breed_data['hypoallergenic'] == 1
      )

      # Option 1: Koristi reference_image_id
      if breed.sample_image_url.blank? && breed_data['reference_image_id'].present?
        reference_image_url = build_reference_image_url(breed_data['reference_image_id'])
        result = upload_to_cloudinary(reference_image_url, breed_data['id'])
        if result
          breed.sample_image_url = result['secure_url']
          breed.sample_image_public_id = result['public_id']
        end
      end

      # Option 2:
      # if breed.sample_image_url.blank?
      #   original_image_url = fetch_sample_image(breed_data['id'])
      #   if original_image_url
      #     result = upload_to_cloudinary(original_image_url, breed_data['id'])
      #     if result
      #       breed.sample_image_url = result['secure_url']
      #       breed.cloudinary_public_id = result['public_id']
      #     end
      #   end
      # end

      # 3. spremi u bazu
      synced_count += 1 if breed.save
    end

    # 4. Označi random X kao featured
    mark_random_as_featured unless Breed.featured.exists?

    synced_count
  end

  def self.fetch_breeds_from_api
    response = get('/breeds', headers: headers)

    if response.success?
      response.parsed_response
    else
      []
    end
  rescue StandardError => e
    Rails.logger.error "Cat API request failed: #{e.message}"
    []
  end

  def self.build_reference_image_url(reference_image_id)
    "https://cdn2.thecatapi.com/images/#{reference_image_id}.jpg"
  end

  def self.fetch_sample_image(breed_id)
    response = get('/images/search',
                   query: { breed_id: breed_id, limit: 1, has_breeds: 1 },
                   headers: headers)

    return unless response.success?

    response.parsed_response.first&.dig('url')
  rescue StandardError => e
    Rails.logger.error "Failed to fetch sample image for breed #{breed_id}: #{e.message}"
    nil
  end

  def self.mark_random_as_featured(count = 4)
    Breed.update_all(featured: false) # rubocop:disable Rails/SkipsModelValidations

    Breed.where.not(sample_image_url: nil)
         .order('RANDOM()')
         .limit(count)
         .update_all(featured: true) # rubocop:disable Rails/SkipsModelValidations
  end

  def self.upload_to_cloudinary(image_url, breed_id) # rubocop:disable Metrics/MethodLength
    return unless image_url

    begin
      Cloudinary::Uploader.upload(
        image_url,
        {
          folder: 'cat_breeds',
          public_id: "breeds_#{breed_id}",
          transformation: [
            { width: 800, height: 600, crop: 'fill', quality: 'auto' }
          ],
          tags: ['cat_breed', 'sample_image']
        }
      )
    rescue Cloudinary::Api::Error => e
      Rails.logger.error "Cloudinary upload failed for breed #{breed_id}: #{e.message}"
      nil
    rescue StandardError => e
      Rails.logger.error "Unexpected error during Cloudinary upload for breed #{breed_id}: #{e.message}" # rubocop:disable Layout/LineLength
      nil
    end
  end

  def self.fetch_breed_images(breed_id, count = 10)
    response = get('/images/search',
                   query: { breed_id: breed_id, limit: count, has_breeds: 1 },
                   headers: headers)

    return [] unless response.success?

    response.parsed_response.map { |img| img['url'] }
  rescue StandardError => e
    Rails.logger.error "Failed to fetch breed images for #{breed_id}: #{e.message}"
    []
  end
end
