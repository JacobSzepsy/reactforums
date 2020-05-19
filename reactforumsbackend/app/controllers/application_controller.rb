require 'jwt'

class ApplicationController < ActionController::API
	before_action :allow_cross_domain_ajax
	def allow_cross_domain_ajax
		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Request-Method'] = 'POST, OPTIONS'
	end
	
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
