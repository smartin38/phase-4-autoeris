class FavoritesController < ApplicationController
    before_action :set_favorite, only: %i[ show update destroy ]

    def index
        favorite = Favorite.all
        render json: favorite
    end

    def show
        favorite = Favorite.find_by(id: params[:id])
        render json: favorite
    end

    def user_favorites
        user = User.find_by!(id: params[:id])
        render json: user
    end

    def create
        token = request.headers["token"]
        user_id = decode_token(token)
        if user_id
            new_favorite = Favorite.create(favorite_params)
            render json: new_favorite
        else
            render json: {error: "401 incorrect token"}, status: 401
        end
    end

    def update
        if favorite.update(favorite_params)
            render json: favorite
        else
            render json: favorite.errors, status: :unprocessable_entity
        end
    end

    def destroy
        favorite = Favorite.find_by!(id: params[:id])
        favorite.destroy
    end

    private

    def set_favorite
        favorite = Favorite.find(params[:id])
    end

    def favorite_params
        params.permit(:name, :title, :user_id, :note_id)
    end
end
