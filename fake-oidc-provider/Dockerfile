FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5227

ENV ASPNETCORE_URLS=http://+:5227

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["fake-oidc-provider/fake-oidc-provider.csproj", "fake-oidc-provider/"]
RUN dotnet restore "fake-oidc-provider/fake-oidc-provider.csproj"
COPY . .
WORKDIR "/src/fake-oidc-provider"
RUN dotnet build "fake-oidc-provider.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "fake-oidc-provider.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
ENV IDENTITYSERVER__KEYSLOCATION=/keys
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "fake-oidc-provider.dll"]
