class GroupsController < ApplicationController

  def new
    @group = Group.new
    @group.users << current_user
    # groupを作る時にログイン中のユーザー情報を登録
  end

  def create
    @group = Group.new(group_params) # private内へ
    if @group.save #もしsaveが成功したら
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new #render,redirect_toは同じとこで２度連続で使えない
    end
  end

  def edit
  end

  def update
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
    # 二重ハッシュ
  end

end
