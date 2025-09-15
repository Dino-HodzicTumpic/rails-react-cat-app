namespace :breeds do
  task sync: :environment do
    CatApiService.sync_all_breeds
  end
end
