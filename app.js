var methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    morgan         = require('morgan'),
    express        = require('express'),
    app            = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

mongoose.connect(process.env.MONGO);

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('combined'));


/////////////////////SCHEMAS////////////////////


var todoSchema = new mongoose.Schema({
    content: String,
    complete: {type: Boolean, default: false}
});

var Todo = mongoose.model('Todo', todoSchema);

var listSchema = new mongoose.Schema({
    listTitle: String,
    todos: [todoSchema]
});

var List = mongoose.model('List', listSchema);


////////////////////ROUTES////////////////////


//Blank list

app.get('/', function(req, res){
  List.find({}, function(err,allLists){
    if(err){
      console.log(err);
    } else{
      res.render('index', {lists: allLists});
    }
  });
});

//Make todo

app.post('/lists/:id/todos', function(req, res){
  List.create(req.body.list, function(err, newList){
    if(err){
      console.log(err);
    } else{
      newList.todos.push(req.body.list.todo);
      newList.save();
      res.redirect(`/lists/${req.params.id}`);
    }
  });
});

//Save list

app.post('/lists', function(req, res){
  List.create(req.body, function(err, newList){
    if(err){
      console.log(err);
    } else{
      console.log(newList);
      res.send(newList._id)
    }
  })
});

//Show list

app.get('/lists/:id', function(req, res){
  List.findById(req.params.id, function(err, foundList){
    if(err){
      console.log(err);
    } else{
      List.find({}, function(err,allLists){
        if (err) {
          console.log(err);
        } else{
          allLists = allLists.map(function(list){
            return {_id: list._id, listTitle: list.listTitle}
          })
          res.render('show', {lists: allLists, list: foundList});
        }
      });
    }
  });
});


//////////////////////////////////////////////


app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log("serve's up fool");
});
