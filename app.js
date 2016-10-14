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

app.get('/', function(req, res){
    List.find({}, function(err,allLists){
        if (err) {
            console.log(err);
        } else {
            res.render('new', {lists: allLists});
        }
    });
});

app.post('/index/:id', function(req, res){
    List.create(req.body.list.todo, function(err, newList){
        if(err) {
            console.log(err);
        } else {
            res.render('show', {list: newList});
        }
    });
});

app.get('/index/',function(req,res){
    Todo.find({}, function(err,allTodos){
        if (err) {
            console.log(err);
        } else {
            List.find({}, function(err,allLists){
                if (err) {
                    console.log(err);
                } else {
                    res.render('show', {lists: allLists, todos: allTodos});
                }
            });
        }
    });
});

app.post('/todos', function(req, res){
    Todo.create(req.body.todo, function(err, newTodo){
        if(err) {
          console.log(err);
        } else {
          res.redirect('/')
        }
    });
});

app.delete('/todos/:id', function(req, res){
  Todo.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.delete('/lists/:id', function(req, res){
  List.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.put('/todos/:id', function(req, res) {
  Todo.findByIdAndUpdate(req.params.id, { $set: {complete: JSON.parse(req.body.complete)}}, function(err, todo){
    if(err){
      console.log(err);
    } else {
      res.send(todo);
    }
  });
});

app.post('/list', function(req, res) {
  List.create({listTitle: req.body.title}, function(err, list) {
    if(err){
      console.log(err);
    } else {
      res.send(list);
    }
  })
})

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log("serve's up fool");
});
