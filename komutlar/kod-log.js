const Discord = require(`discord.js`);
const db = require(`quick.db`)


exports.run = async (bot, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || bot.conf.prefix;
    const yetki = new Discord.MessageEmbed()
    .setAuthor(bot.conf.botadı, bot.avatarURL)
    .setColor(bot.conf.renk)
    .setDescription(`Bu komutu kullanabilmek için Sunucuyu Yönet yetkisine sahip olmalısın!`)
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(yetki)
  let sistem = db.fetch(`kodsistemi.${message.guild.id}`)
  const acikdegil = new Discord.MessageEmbed()
  .setAuthor(bot.conf.botadı, bot.avatarURL)
  .setColor(bot.conf.renk)
  .setDescription(`Bu komutu kullanabilmek için kod sistemini açman gerekiyor! ${prefix}kod-sistemi aç`)
if(!sistem) return message.channel.send(acikdegil)
let kodkanal = message.mentions.channels.first();
let kanal = await db.fetch(`kodK.${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!kanal) return message.channel.send(`kod kanal sistemini kapatmak için \`kod kanalının\` seçili olması lazım örnek kullanım: \`${prefix}kod-kanal #kanal\``);
    
   db.delete(`kodK.${message.guild.id}`)
  
   message.channel.send(`kod kanalı başarıyla kapatıldı.`);
 
  
    return
  }
  
if (!kodkanal) return message.channel.send(`kod kanalını bulamadım. Kullanım ${prefix}kod-kanal #kanal`);
 

   db.set(`kodK.${message.guild.id}`, kodkanal.id)

 message.channel.send(`kod kanalı ${kodkanal} olarak ayarlandı\nSıfırlamak için ${prefix}kod-kanal sıfırla`);





}

  
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`kod-kanal`,`kodkanal`,`kod-kanalayarla`,"kod-log","kodlog"],
  kategori: "kod",
  permLevel: 0
};

module.exports.help = {
  name: `kod-kanal-ayarla`,
  description: `Girince mesaj atılacak kanalını ayarlar`,
  usage: `hgbb-kanal`
};