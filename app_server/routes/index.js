var express = require('express');
var router = express.Router();

// controllers
const ctrlAnalysis = require('../controllers/analysis'); // ANALYSIS page controller
const ctrlAddExpenses = require('../controllers/add_expenses'); // ADD_EXPENSES page controller
const ctrlFirstPage = require('../controllers/first_page'); // FIRSTPAGE page controller
const ctrlGroups = require('../controllers/groups'); // GROUPS page controller
const ctrlGraphs = require('../controllers/graphs'); // GRAPHS page controller
const ctrlIndex = require('../controllers/index'); // INDEX page controller
const ctrlLogin = require('../controllers/login'); // LOGIN page controller
const ctrlProfil = require('../controllers/profil'); // PROFIL page controller
const ctrlSearch = require('../controllers/search'); // SEARCH page controller
const ctrlSignUp = require('../controllers/signup'); // SIGN_UP page controller
const ctrlSettings = require('../controllers/settings'); // SETTINGS page controller



// ROUTER
router.get('/add_expenses', ctrlAddExpenses.add_expenses);
router.get('/analysis', ctrlAnalysis.analysis);
router.get('/first_page', ctrlFirstPage.page);
router.get('/graphs', ctrlGraphs.graphs);
router.get('/groups', ctrlGroups.groups);
router.get(['/', '/index'], ctrlIndex.index);
router.get('/login', ctrlLogin.login);
router.get('/profil', ctrlProfil.profil);
router.get('/settings', ctrlSettings.settings);
router.get('/signup', ctrlSignUp.signup);
router.get('/search', ctrlSearch.search);


module.exports = router;
