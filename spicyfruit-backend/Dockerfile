FROM php:apache

# get exif and other php defaults setup
RUN docker-php-ext-install exif
RUN echo "ServerName 0.0.0.0" >> /etc/apache2/apache2.conf
RUN echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/php.ini
RUN echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/php.ini
RUN echo "max_file_uploads = 50" >> /usr/local/etc/php/conf.d/php.ini
RUN echo "session.cookie_httponly = 1" >> /usr/local/etc/php/conf.d/php.ini
RUN echo "session.use_only_cookies = 1" >> /usr/local/etc/php/conf.d/php.ini
RUN echo "session.cookie_secure = 1" >> /usr/local/etc/php/conf.d/php.ini

# setup mail
RUN apt-get update && apt-get install -q -y ssmtp mailutils

# root is the person who gets all mail for userids < 1000
RUN echo "root=admin@spicyfruit.me" >> /etc/ssmtp/ssmtp.conf

# gmail configuration
RUN echo "mailhub=smtp.gmail.com:587" >> /etc/ssmtp/ssmtp.conf
RUN echo "AuthUser=orangebananaspy@gmail.com" >> /etc/ssmtp/ssmtp.conf
RUN echo "AuthPass=lpipblnykkkhgwxj" >> /etc/ssmtp/ssmtp.conf

RUN echo "UseTLS=YES" >> /etc/ssmtp/ssmtp.conf
RUN echo "UseSTARTTLS=YES" >> /etc/ssmtp/ssmtp.conf

RUN echo "FromLineOverride=yes" >> /etc/ssmtp/ssmtp.conf

# set up php sendmail config
RUN echo "sendmail_path=sendmail -i -t" >> /usr/local/etc/php/conf.d/php-sendmail.ini

# cleanup
RUN rm -rf /var/lib/apt/lists/* /tmp/* && apt-get autoremove -y && apt-get autoclean
