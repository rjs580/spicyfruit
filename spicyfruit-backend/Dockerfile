FROM php:latest
RUN mkdir -p /usr/src/spicyfruit_backend
WORKDIR /usr/src/spicyfruit_backend
COPY . /usr/src/spicyfruit_backend
RUN echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/php.ini
RUN echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/php.ini
RUN echo "max_file_uploads = 50" >> /usr/local/etc/php/conf.d/php.ini
EXPOSE 8080
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/usr/src/spicyfruit_backend"]
