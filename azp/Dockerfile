FROM ubuntu:18.04

# To make it easier for build and release pipelines to run apt-get,
# configure apt to not require confirmation (assume the -y argument by default)
ENV DEBIAN_FRONTEND=noninteractive
RUN echo "APT::Get::Assume-Yes \"true\";" > /etc/apt/apt.conf.d/90assumeyes

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    jq \
    git \
    iputils-ping \
    libcurl4 \
    libssl1.0.0 \
    libicu60 \
    libunwind8 \
    netcat \
    zip \
    unzip

WORKDIR /azp

COPY ./.token .
COPY ./start.sh .
RUN chmod +x start.sh

RUN mkdir agent
RUN chmod -R 777 /azp

CMD ["./start.sh"]