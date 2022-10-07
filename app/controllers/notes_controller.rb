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

    def create
        token = request.headers["token"]
        user_id = decode_token(token)
        if user_id
            new_note = Note.create(note_params)
            render json: new_note
        else
            render json: {error: "401 incorrect token"}, status: 401
        end
    end

    def update
        if note.update(note_params)
            render json: note
        else
            render json: favorite.errors, status: :unprocessable_entity
        end
    end

    def destroy
        note = note.find_by!(id: params[:id])
        note.destroy
    end

    private

    def set_note
        note = note.find(params[:id])
    end

    def note_params
        params.permit(:name, :content, :user_id, :favorite_id)
    end
end
