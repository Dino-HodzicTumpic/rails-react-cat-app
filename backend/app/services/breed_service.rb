class BreedService
  def list_all_breeds
    breeds = Breed.all

    breeds.map do |breed|
      {
        breed_id: breed.id,
        breed_name: breed.breed_name,
        origin: breed.origin,
        sample_image_url: breed.sample_image_url

      }
    end
  end
end
