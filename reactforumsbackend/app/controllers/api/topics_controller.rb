module Api
	class TopicsController < ApplicationController
		
		def index
			boards = {}
			Board.all.each do |n|
				topics = []
				Topic.where(:board => n[:name]).each do |m|
					topics << m
				end
				boards[:"#{n[:name]}"] = topics
			end
			puts boards
			render json: {status: "GOOD", boards: boards},status: :ok
		end

		def create
			tokenStatus = tokenValidate(params[:token])
			if tokenStatus[:status]
				if Board.where(:name => params[:board]).exists?
					@topic = Topic.new do |topic|
						topic.subject = params[:subject]
						topic.createdBy = tokenStatus[:username]
						topic.board = params[:board]
					end

					if @topic.save
						@post = Post.new do |post|
							post.user = tokenStatus[:username]
							post.thread = @topic.id
							post.body = params[:body]
						end
					
						if @post.save
							render json: {status: 'GOOD', message: 'thread created', data:@topic},status: :ok
						else
							render json: {status: 'ERROR', message: 'thread not created'},status: :unprocessable_entity
						end
					else
						render json: {status: 'ERROR', message: 'thread not created'},status: :unprocessable_entity
					end
				else
					render json: {status: 'ERROR', message: 'board does not exist'},status: :unprocessable_entity
				end
			else
				render json: {status: 'ERROR', message: 'invalid token'},status: :unprocessable_entity
			end
			
		end

		def show
			@topics = Topic.where(board: params[:id]).order('created_at DESC')
			if @topics.exists?
				render json: {status: 'GOOD', message: 'sending threads', data:@topics},status: :ok
			else
				render json: {status: 'ERROR', message: 'no threads found'},status: :unprocessable_entity
			end
		end	
	end
end