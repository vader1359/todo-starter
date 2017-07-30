require 'bundler/setup'
Bundler.require

require_relative "list"

def debug_params
  puts "PARAMS: #{params}"
end

get "/" do
  # HINT: you can use instance variables in the view directly without passing to locals
  # such as this @title instance variable
  @title = "Your App Name"
  # Need to get an arrays of lists here
  all_data_paths = Dir["./data/*.md"]
  all_data_paths.each {|path|}
  all_files = all_data_paths.map {|path| File.basename path, ".md"} 
  all_lists = all_files.map {|file| List.new(file)}
  all_lists = all_lists.each {|list| list.load_from_file}
  new_id = all_files[-1].to_i + 1
  
  
  # Check folder how mawny list -> create List with name -> Add to all_lists Done
  # list = List.new("0") Should be del
  # list.load_from_file
  # erb :"index.html", locals: {list: list}, layout: :"layout.html"
  erb :"index.html", locals: {all_lists: all_lists, new_id: new_id}, layout: :"layout.html"
end

# UPDATE a list with id from params["id"]
post "/lists/update" do
  
  
  list = List.new(params["id"])
  list.name = params["name"]
  # no need to load from file. we will save new contents to file
  
  items = params["items"].map do |item_hash|
    puts "creating Item from item_hash: #{item_hash}"
    Item.new(item_hash["name"], item_hash["status"])
  end
  list.items = items
  
  if params["toggle"]
    puts "Toggle: #{params["toggle"]}"
    list.toggle_item(params["toggle"])
  end
  
  list.save!
  redirect back
end

post "/lists/:id/items/add" do
  debug_params
  
  list = List.new(params["id"])
  list.load_from_file
  puts "Creating item #{params['name']} for list #{params['id']}"
  if params["name"]
    list.add(params["name"])
    list.save!
  end
  redirect back
end

post "/add-list" do
  puts "PARAMS: #{params}"
  puts params[:new_list_name]
  # Need to create a file with param
  # First test with id = 1 but 
  # it should check the lastest file index and +1 and save file name
  new_list = List.new(params[:new_id])
  new_list.name = params[:new_list_name]
  new_list.save!
  
  redirect to("/")
  
  
end


post "/change_lists_order" do
  # puts "PARAMS $" params
  # puts "DATA #{data}"
  puts params
  params[:names].map.with_index do |name, index|
    # 0 Today 1 Tomorrow 2 Done
    # 0 Done 1 Today 2 Tomorrow
    
    filename = "data/#{index}.md"
    puts filename
    lines = File.read(filename).split("\n")
    lines.delete_at(0)
    lines.unshift(name)
    File.write(filename, lines.join("\n"))
    
  end
  
  
  redirect back
end

post "/add_list" do
  # redirect back
  puts params
end
