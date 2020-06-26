# Конфиг для nginx
# публикует prod версию по alias`у: [ http://chernomorsk.dev ]

server {
	listen 0.0.0.0:80;
	server_name chernomorsk.dev;
	root /var/www/chernomorsk.react/build;
	index index.html;
	access_log /var/log/nginx/chernomorsk.access.log;
	error_log /var/log/nginx/chernomorsk.error.log;

	location / {
        if (!-e $request_filename) {
           rewrite ^/(.*)/$ /$1 redirect;
        }
        if (!-e $request_filename) {
           rewrite ^(.*)$ /index.html break;
        }
    }
}

# Manual(s)
# https://github.com/katopz/es7-async-await