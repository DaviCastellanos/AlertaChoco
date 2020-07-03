#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV TWILIO_AUTH_TOKEN=b5dcc9cdb05bd541eda90037d2e4e248
ENV TWILIO_ACCOUNT_SID=ACa6d64c8f885c4a5d11e5bd40940ed44c
ENV ARCGIS_ID=BEg1xjqGA67M79uz
ENV ARCGIS_SECRET=4d3ad20dfef74e999b4d93795e51f769
ENV MAIL_PASSWORD=alertachoco123

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY whats-app-rest.csproj ./
RUN dotnet restore "./whats-app-rest.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "whats-app-rest.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "whats-app-rest.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "whats-app-rest.dll", "--environment=X"]
