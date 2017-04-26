# BookView
后台API
	DEBUG=bookapi:* npm start



# Docker
	docker build -t bookviewmg .
#本地的3163端口，映射到容器中的8000端口
	docker run --name bookviewcontainer -d -p 3163:8000  bookviewimg
	
# 本地访问 http://localhost:3163/


#构造镜像
docker build -t webapi:0.2 .
#运行
docker run --name bookviewcontainer -d -p 3163:8000 webapi:0.2
#访问页面
http://localhost:3163/