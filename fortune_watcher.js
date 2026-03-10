const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const targetFile = path.join(process.env.HOME, 'meus_fortunes');

console.log(`👀 Monitorando: ${targetFile}`);

// Função que roda o comando do sistema
const updateIndex = () => {
  exec(`strfile ${targetFile} ${targetFile}.dat`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erro: ${error.message}`);
      return;
    }
    console.log(`✅ Índice atualizado! ${stdout.trim()}`);
  });
};

// Monitora mudanças no arquivo
fs.watch(targetFile, (eventType) => {
  if (eventType === 'change') {
    updateIndex();
  }
});
