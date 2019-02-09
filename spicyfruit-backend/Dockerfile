FROM php:latest
RUN mkdir -p /usr/src/spicyfruit_backend
WORKDIR /usr/src/spicyfruit_backend
COPY . /usr/src/spicyfruit_backend
EXPOSE 8080
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/usr/src/spicyfruit_backend"]
