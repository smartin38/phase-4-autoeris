class NotesController < ApplicationController
before_action :set_note, only: %i[ show update destroy ]

    def index
        note = Note.all
        render json: note
    end

    def show
        note = Note.find_by(id: params[:id])
        render json: note
    end

    def user_favorites
        user = User.find_by!(id: params[:id])
        render json: user
    end

    # def create
    #     token = request.headers["token"]
    #     user_id = decode_token(token)
    #     if user_id
    #         new_note = Note.create!(name: params[:name], content: params[:content], user_id: user_id, favorite_id: user_id)
    #         render json: new_note
    #     else
    #         render json: {error: "401 incorrect token"}, status: 401
    #     end
    # end
      
    def create
        note = Note.create!(note_params)
        render json: note
    end
    # def create
    #     # token = request.headers["token"]
    #     # user_id = decode_token(token)
    #     note = Note.create!(note_params)
    #     render json: note
    # end

    # def create
    #     note = Note.create!(name: params[:name],content: params[:content])
    #     render json: note
    # end

    def update
        note = Note.find_by!(id: params[:id])
        note =  Note.update!(note_params)
        render json: note
    end

    def destroy
        note = Note.find_by!(id: params[:id])
        note.destroy
    end

    private

    def set_note
        note = Note.find(params[:id])
    end

    def note_params
        params.permit(:name, :content, :user_id, :favorite_id)
        # params.permit(:name, :content, :user_id)
    end
end
