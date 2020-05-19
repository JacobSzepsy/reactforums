module Api
	class PostsController < ApplicationController
			
		def create
			tokenStatus = tokenValidate(params[:token])
			if tokenStatus[:status]
				if Topic.where(:id => params[:thread]).exists?
					@post = Post.new do |post|
						post.user = tokenStatus[:username]
						post.thread = params[:thread]
						post.body = params[:body]
					end
				
					if @post.save
						render json: {status: 'GOOD', message: 'post created', data:@post},status: :ok
					else
						render json: {status: 'ERROR', message: 'post not created'},status: :unprocessable_entity
					end
				else
					render json: {status: 'ERROR', message: 'thread does not exist'},status: :unprocessable_entity
				end
			else
				render json: {status: 'ERROR', message: 'invalid token'},status: :unprocessable_entity
			end
		end

		def show
			@posts = Post.where(thread: params[:id]).order('created_at ASC')
			if @posts.exists?
				render json: {status: 'GOOD', message: 'sending posts', data:@posts},status: :ok
			else
				render json: {status: 'ERROR', message: 'no posts found'},status: :unprocessable_entity
			end
		end	
	end
end