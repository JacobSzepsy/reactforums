require 'jwt'

class ApplicationController < ActionController::API
	def tokenValidate(token)
		begin
			decodedToken = JWT.decode params[:token], 'SuperSecret', true, { algorithm: 'HS256' }
		rescue JWT::ExpiredSignature
			return {status: false}
		rescue JWT::DecodeError
			return {status: false}
		else
			return {status: true, username: decodedToken[0]["user"]}
		end
	end
end
