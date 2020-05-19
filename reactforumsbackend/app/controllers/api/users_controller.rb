module Api
require 'digest'
require 'jwt'

	class UsersController < ApplicationController

		#POST api/users/validate
		def validate
			if tokenValidate(params[:token])[:status]
			 	render json: {status: 'GOOD', message: 'token validated'},status: :ok
			else
				render json: {status: 'ERROR', message: 'invalid token'},status: :unprocessable_entity
			end
		end

		#POST api/users/
		def create
			if User.where(username: params[:username]).exists?
				render json: {status: 'ERROR', message: 'user already exists'},status: :unprocessable_entity
			else
				@user = User.new do |user|
					user.username = params[:username]
					user.password = Digest::SHA256.hexdigest(params[:password])
				end

				if @user.save
					payload = {user: @user.username, exp: Time.now.to_i + 3600}
					#TODO: Switch this to enviornment variables
					token = JWT.encode payload, 'SuperSecret', 'HS256'
					render json: {status: 'GOOD', message: 'user created succesfully', token: token},status: :ok
				else
					render json: {status: 'ERROR', message: 'error creating user'},status: :unprocessable_entity
				end
			end
		end

		#POST api/users/login
		def login
			@user = User.where(username: params[:username])

			if @user.exists?
				if @user[0].password == Digest::SHA256.hexdigest(params[:password])
					payload = {user: @user[0].username, exp: Time.now.to_i + 3600}
					#TODO: Switch this to enviornment variables
					token = JWT.encode payload, 'SuperSecret', 'HS256'
					render json: {status: 'Good', message: 'login succesful', token: token},status: :ok
				else
					render json: {status: 'ERROR', message: 'incorrect username or password'},status: :unprocessable_entity
				end
			else
				render json: {status: 'ERROR', message: 'incorrect username or password'},status: :unprocessable_entity
			end
		end
	end
end