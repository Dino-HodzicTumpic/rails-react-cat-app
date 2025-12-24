class SearchService
  # vraca prijedloge za autocomplete
  def self.suggestions(search_text)
    query = search_text.to_s.strip

    Breed.where('breed_name ILIKE ?', "%#{query}%").limit(5).select(:id, :breed_name, :origin,
                                                                    :sample_image_url)
  end

  def self.results(search_text)
    query = search_text.to_s.strip
    return Breed.none if query.blank?

    Breed.where('breed_name ILIKE ?', "%#{query}%").select(:id, :breed_name, :origin,
                                                           :sample_image_url, :description)
  end

  def delf.filtered_results(_filters) # rubocop:disable Metrics/AbcSize,Metrics/MethodLength,Metrics/CyclomaticComplexity,Metrics/PerceivedComplexity
    # ako nije poslan neki min onda je default 1 a max je default 5
    min_intelligence = params[:min_intelligence]&.to_i || 1
    max_intelligence = params[:max_intelligence]&.to_i || 5
    min_affection = params[:min_intelligence]&.to_i || 1
    max_affection = params[:max_intelligence]&.to_i || 5
    min_child_friendly = params[:min_intelligence]&.to_i || 1
    max_child_friendly = params[:max_intelligence]&.to_i || 5
    min_dog_friendly = params[:min_intelligence]&.to_i || 1
    max_dog_friendly = params[:max_intelligence]&.to_i || 5
    min_stranger_friendly = params[:min_intelligence]&.to_i || 1
    max_stranger_friendly = params[:max_intelligence]&.to_i || 5
    min_social_needs = params[:min_intelligence]&.to_i || 1
    max_social_needs = params[:max_intelligence]&.to_i || 5
    min_vocalisation = params[:min_intelligence]&.to_i || 1
    max_vocalisation = params[:max_intelligence]&.to_i || 5
    min_energy = params[:min_intelligence]&.to_i || 1
    max_energy = params[:max_intelligence]&.to_i || 5
    min_health_issues = params[:min_intelligence]&.to_i || 1
    max_health_issues = params[:max_intelligence]&.to_i || 5
    min_grooming = params[:min_intelligence]&.to_i || 1
    max_grooming = params[:max_intelligence]&.to_i || 5

    Breed.where("intelligence between ? AND ? AND
                          affection_level between ? AND ? AND
                        child_friendly between ? AND ? AND
                            dog_friendly between ? AND ? AND
                             social_needs between ? AND ? AND
                              vocalisation between ? AND ? AND
                               health_issues between ? AND ? AND
                                energy_level between ? AND ? AND
                                 stranger_friendly between ? AND ? AND
                                  grooming between ? AND ?",
                min_intelligence, max_intelligence,
                min_affection, max_affection,
                min_child_friendly, max_child_friendly,
                min_dog_friendly, max_dog_friendly,
                min_social_needs, max_social_needs,
                min_vocalisation, max_vocalisation,
                min_health_issues, max_health_issues,
                min_energy, max_energy,
                min_stranger_friendly, max_stranger_friendly,
                min_grooming, max_grooming)
  end
end
