
const add_expenses = (req, res) => {
    res.render('add_expenses',{
      title: 'Dodaj',
      stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
      scripts_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"]
    });
  };
  
  
  module.exports = {
    add_expenses,
  };