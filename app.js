var methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    morgan         = require('morgan'),
    express        = require('express'),
    app            = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/todo');
app.use(methodOverride('_method'));
app.use(morgan('combined'));

var TodoSchema = new mongoose.Schema({
    content: String,
    created: {type: Date, default: Date.now},
    complete: {type: Boolean, default: false}
});

var Todo = mongoose.model('Todo', TodoSchema);

app.get('/',function(req,res){
    Todo.find({}, function(err,allTodos){
        if (err) {
            console.log(err);
        } else {
            res.render('index', {todos: allTodos});
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

app.put('/todos/:id', function(req, res) {
  Todo.findByIdAndUpdate(req.params.id, { $set: {complete: JSON.parse(req.body.complete)}}, function(err, todo){
    if(err){
      console.log(err);
    } else {
      res.send(todo);
    }
  });
});

app.listen(3000, function(){
    console.log("serve's up fool");
});
