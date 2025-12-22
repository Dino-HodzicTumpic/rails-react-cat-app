class SearchService
  # vraca predloge za autocomplete
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
end
