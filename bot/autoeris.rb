require 'discordrb'
require 'net/http'
require 'uri'
require 'json'
# require 'launchy'
# require 'mechanize'

bot = Discordrb::Commands::CommandBot.new token: 'MTAyNTQyMDc4OTI4MzAzMzE2OQ.GEa47-.3ZQdblfFICONorAN4DCiGRiCg4kyO2kxkl6494', client_id: "1025420789283033169", prefix: "!"

puts 'bot is running.'

# liz test access token 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
# shane test access tokeb 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

uri = URI.parse("https://api.github.com/orgs/autoeris/repos")
request = Net::HTTP::Post.new(uri)
request["Accept"] = "application/vnd.github+json"
request["Authorization"] = "Bearer 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"

req_options = {
  use_ssl: uri.scheme == "https",
}

authkey = ""
user = ""
$repos = []
$userrepos = []

#lists all bot commands
bot.command(:help) do |event|
	event.respond "Hello #{event.user.username}, my name is Eris! Here are all the things I can do:
  !iam: This command tells me who is going to be utilizing the repo functions I have. Input an OAuth key and watch me go!
  !usercheck: Confirms who is currently connected to Eris.
  !create4me: Makes a personal repo for you.
  !delete4me: Deletes a personal repo.
  !create: Makes a repo in the autoeris org. Don't worry, it'll still belong to you!
  !delete: Delets an autoeris repo.
  !rename: Renames a repo to something else. Only works with repos you have permission to edit!
  !gift: Transfers repo ownership to another github user. They'll have to accept ownership in an email, for security reasons.
  !erislist: Shows all the repos that currently exist in the autoeris org.
  !mylist: Shows all the current users repos."
end

#sets auth key and auth dependencies
bot.command(:iam, min_args: 1) do |event, key|
  authkey = key
  getuser(authkey)
  user = getuser(authkey)
  geterisrepos(authkey)
  getuserrepos(authkey, user)
  event.respond "Eris will publish to your github! This is very secure!"
end

#discovers users github username
def getuser(authkey)
  uri = URI.parse("https://api.github.com/user")
  request = Net::HTTP::Get.new(uri)
  request["Accept"] = "application/vnd.github+json"
  request["Authorization"] = "Bearer #{authkey}"

  req_options = {
  use_ssl: uri.scheme == "https",
  }

  response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
  result = JSON.parse(response.body)
  result["login"]
end

#discovers autoeris repos
def geterisrepos(authkey)
  uri = URI.parse("https://api.github.com/orgs/autoeris/repos")
  request = Net::HTTP::Get.new(uri)
  request["Accept"] = "application/vnd.github+json"
  request["Authorization"] = "Bearer #{authkey}"
  
  req_options = {
    use_ssl: uri.scheme == "https",
  }
  
  response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
    http.request(request)
  end
  result = JSON.parse(response.body)
  result.each do |res| 
    $repos << res["name"]
  end
end

#discovers user repos
def getuserrepos(authkey, user)
  uri = URI.parse("https://api.github.com/users/#{user}/repos")
  request = Net::HTTP::Get.new(uri)
  request["Accept"] = "application/vnd.github+json"
  request["Authorization"] = "Bearer #{authkey}"
  
  req_options = {
    use_ssl: uri.scheme == "https",
  }
  
  response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
    http.request(request)
  end
  result = JSON.parse(response.body)
  result.each do |res| 
    $userrepos << res["name"]
  end
end

#shows all eris repos
bot.command(:erislist) do |event|
  joined_repos = $repos.join(", ")
	event.respond "Existing repos in autoeris are: #{joined_repos}"
end

#shows all user repos
bot.command(:mylist) do |event|
  joined_repos = $userrepos.join(", ")
	event.respond "#{user}s existing repos are: #{joined_repos}"
end

#creates a repo under the users account
bot.command(:create4me, min_args: 1) do |event, repo, *desc|
  joined_desc = desc.join(" ")
  uri = URI.parse("https://api.github.com/user/repos")
  request = Net::HTTP::Post.new(uri)
  request["Accept"] = "application/vnd.github+json"
  request["Authorization"] = "Bearer #{authkey}"
  request.body = JSON.dump({
    "name" => "#{repo}",
    "description" => "#{joined_desc}",
    "homepage" => "https://github.com",
    "private" => false,
    "has_issues" => false,
    "has_projects" => false,
    "has_wiki" => false,
    "auto_init" => true
  })
  req_options = {
    use_ssl: uri.scheme == "https",
  }
  response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
    http.request(request)
  end
  response.body
  event.respond "Eris made a repo for you!"
  puts 'repo made successfully'
end

#deletes specified github repo
bot.command(:delete4me, min_args: 1) do |event, repo|
  uri = URI.parse("https://api.github.com/repos/#{user}/#{repo}")
  request = Net::HTTP::Delete.new(uri)
  request["Accept"] = "application/vnd.github+json"
  request["Authorization"] = "Bearer #{authkey}"

  req_options = {
  use_ssl: uri.scheme == "https",
  }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
  response.body
  event.respond "Eris has destroyed a repo with prejudice!"
  puts 'repo obliterated successfully'
end

#creates an autoeris org repo under the users account
bot.command(:create, min_args: 1) do |event, repo, *desc|
  joined_desc = desc.join(" ")
  uri = URI.parse("https://api.github.com/repos/#{user}/#{repo}")
  response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
    request["Accept"] = "application/vnd.github+json"
    request["Authorization"] = "Bearer #{authkey}"
    request.body = JSON.dump({
      "name" => "#{repo}",
      "description" => "#{joined_desc}",
      "homepage" => "https://github.com",
      "private" => false,
      "has_issues" => false,
      "has_projects" => false,
      "has_wiki" => false,
      "auto_init" => true
    })
    http.request(request)
  end
  response.body
  event.respond "Eris made an organization repo for you!"
  puts 'repo made successfully'
end

#deletes specified github repo
bot.command(:delete, min_args: 1) do |event, repo|
  uri = URI.parse("https://api.github.com/repos/autoeris/#{repo}")
  request = Net::HTTP::Delete.new(uri)
  request["Accept"] = "application/vnd.github+json"
  request["Authorization"] = "Bearer #{authkey}"

  req_options = {
  use_ssl: uri.scheme == "https",
  }

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
  response.body
  event.respond "Eris has destroyed a repo with prejudice!"
  puts 'repo obliterated successfully'
end

#renames specified repo
bot.command(:rename, min_args: 2) do |event, repo, name|
  uri = URI.parse("https://api.github.com/repos/#{user}/#{repo}")
  request = Net::HTTP::Patch.new(uri)
  request["Accept"] = "application/vnd.github+json"
  request["Authorization"] = "Bearer #{authkey}"
  request.body = JSON.dump({
  "name" => "#{name}",
  })

  req_options = {
  use_ssl: uri.scheme == "https",
  }
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
  response.body
  event.respond "Eris has renamed #{repo} to #{name}!"
  puts 'repo renamed'
end

#transfers ownership of repo, pending email confirmation by receiver
bot.command(:gift, min_args: 2) do |event, repo, name|
  uri = URI.parse("https://api.github.com/repos/#{user}/#{repo}/transfer")
  request = Net::HTTP::Post.new(uri)
  request["Accept"] = "application/vnd.github+json"
  request["Authorization"] = "Bearer #{authkey}"
  request.body = JSON.dump({
  "new_owner" => "#{name}",
  })

  req_options = {
  use_ssl: uri.scheme == "https",
  }
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
  response.body
  event.respond "Eris has transfered #{repo} to #{name}! Hope they don't break it..."
  puts 'repo transfered'
end


##################################################
##              TEST COMMAND CODE               ##
##################################################

bot.command :ping do |event|
  event.respond "pong"
  puts '!ping success'
end


bot.command(:hello) do |event|
	event.respond "hello #{event.user.name}"
end


#shows github auth key in use
bot.command(:keycheck) do |event|
	event.respond authkey
end

#shows github username in use
bot.command(:usercheck) do |event|
	event.respond user
end

bot.run