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

  def self.filtered_results(filters) # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
    min_intelligence, max_intelligence = extract_filter_range(filters, :intelligence)
    min_affection, max_affection = extract_filter_range(filters, :affection)
    min_child_friendly, max_child_friendly = extract_filter_range(filters, :child_friendly)
    min_dog_friendly, max_dog_friendly = extract_filter_range(filters, :dog_friendly)
    min_stranger_friendly, max_stranger_friendly = extract_filter_range(filters, :stranger_friendly)
    min_social_needs, max_social_needs = extract_filter_range(filters, :social_needs)
    min_vocalisation, max_vocalisation = extract_filter_range(filters, :vocalisation)
    min_health_issues, max_health_issues = extract_filter_range(filters, :health_issues)
    min_energy, max_energy = extract_filter_range(filters, :energy)
    min_grooming, max_grooming = extract_filter_range(filters, :grooming)

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

  def self.extract_filter_range(filters, key)
    default_min = 1
    defalt_max = 5

    range = filters[key.to_s] || {}
    min = range['min'] || default_min
    max = range['max'] || defalt_max
    [min.to_i, max.to_i]
  end
end
