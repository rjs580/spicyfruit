FROM php:latest
RUN mkdir -p /usr/src/spicyfruit_backend
WORKDIR /usr/src/spicyfruit_backend
COPY . /usr/src/spicyfruit_backend
EXPOSE 80
CMD ["php", "-S", "0.0.0.0:80", "-t", "/usr/src/spicyfruit_backend"]
