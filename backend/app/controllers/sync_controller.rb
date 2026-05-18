class SyncController < ApplicationController
  def breeds
    result = CatApiService.sync_all_breeds

    render json: {
      success: true,
      synced: result
    }
  end
end
