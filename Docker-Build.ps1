$Docker_Exists = (docker ps -a) -match "youtubemixer-qa"
if($Docker_Exists){
    if($Docker_Exists -notmatch 'Exited'){
        docker stop "youtubemixer-qa"
    }

    docker rm "youtubemixer-qa"
}
if((docker image ls) -match "yumix"){
    docker image rm yumix
}


try{
    Push-Location $PSScriptRoot
    docker build -t yumix --build-arg Youtube_API_Key=$Env:Youtube_API_Key --build-arg Environment='Dev' .
}
catch{
    Write-Host 'test'
    return
}
finally{
    Pop-Location
}

docker run --name "youtubemixer-qa" -p 0.0.0.0:3000:8080/tcp 'yumix'
