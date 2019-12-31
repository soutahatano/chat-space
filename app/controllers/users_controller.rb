class UsersController < ApplicationController
  # before_action :set_group, only: :index

  def index
    @users = User.search(params[:keyword], params[:ids])
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  # def set_group
  #   @group = Group.find(params[:group_id])
  # end
end
