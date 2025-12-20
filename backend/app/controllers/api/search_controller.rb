module Api
  class SearchController < ApplicationController
    def breeds_autocomplete
      suggestions = SearchService.suggestions(params[:query])
      render json: { suggestions: suggestions }, status: :ok
    rescue StandardError => e
      Rails.logger.error "SearchService suggestions error: #{e.message}"
      render json: { error: 'An error occurred while fetching suggestions' }, status: :bad_request
    end

    def breeds
      search_results = SearchService.results(params[:query])
      render json: { search_results: search_results }, status: :ok
    rescue StandardError => e
      Rails.logger.error "SearchService search breeds error: #{e.message}"
      render json: { error: 'An error occurred while fetching search results for breeds' },
             status: :bad_request
    end
  end
end
