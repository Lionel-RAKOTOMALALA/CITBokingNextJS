module.exports = {
  types: [
    { value: 'feat',     name: 'feat:     Nouvelle fonctionnalité' },
    { value: 'fix',      name: 'fix:      Correction de bug' },
    { value: 'docs',     name: 'docs:     Documentation uniquement' },
    { value: 'style',    name: 'style:    Changement de style (formatage, etc)' },
    { value: 'refactor', name: 'refactor: Refactorisation du code' },
    { value: 'perf',     name: 'perf:     Amélioration des performances' },
    { value: 'test',     name: 'test:     Ajout ou correction de tests' },
    { value: 'chore',    name: 'chore:    Tâches diverses' },
  ],
  messages: {
    type: "Sélectionnez le type de modification que vous effectuez :",
    scope: '\nIndiquez le SCOPE de cette modification (optionnel) :',
    subject: 'Rédigez une brève description :\n',
    body: 'Description plus longue du commit (optionnel). Utilisez "|" pour un retour à la ligne :\n',
    breaking: 'Listez les BREAKING CHANGES (optionnel) :\n',
    footer: 'Problèmes liés (optionnel) :\n',
    confirmCommit: 'Êtes-vous sûr de vouloir continuer avec le commit ci-dessus ?'
  },
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  subjectLimit: 100,
}; 