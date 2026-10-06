# syntax=docker/dockerfile:1
FROM golang:1.26-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY cmd ./cmd
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags='-s -w' -o /out/skills-api ./cmd/api

FROM alpine:3.22
COPY --from=build /out/skills-api /skills-api
EXPOSE 8080
RUN adduser -D -H -u 10001 appuser
USER appuser
ENTRYPOINT ["/skills-api"]
