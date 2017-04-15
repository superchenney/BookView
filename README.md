# BookView
后台API
	DEBUG=bookapi:* npm start



	docker build -t bookviewimg .
#本地的3163端口，映射到容器中的8000端口
	docker run --name bookviewcontainer -d -p 3163:8000  bookviewimg
	

	http://localhost:3163/