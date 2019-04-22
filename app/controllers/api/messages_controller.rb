class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages
    respond_to do |format|
      format.html
      format.json { @messages = @messages.where('id > ?', params[:id])}
    end
  end
end
