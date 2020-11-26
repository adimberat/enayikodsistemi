const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const yetki = new Discord.MessageEmbed()
  .setAuthor(client.conf.botadı, client.avatarURL)
  .setColor(client.conf.renk)
  .setDescription(`Bu komutu kullanabilmek için Sunucuyu Yönet yetkisine sahip olmalısın!`)
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(yetki)
let sistem = db.fetch(`kodsistemi.${message.guild.id}`)
const acikdegil = new Discord.MessageEmbed()
.setAuthor(client.conf.botadı, client.avatarURL)
.setColor(client.conf.renk)
.setDescription(`Bu komutu kullanabilmek için kod sistemini açman gerekiyor! ${prefix}kod-sistemi aç`)
if(!sistem) return message.channel.send(`sistemi açsana moruk ${prefix}kod-sistemi aç`)

 
 
 
    let rol = message.mentions.roles.first()
 
 
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.conf.prefix;
    if(args[0] === 'kapat' || args[0] === 'sıfırla') {
   if (db.has(`kodyetkiliR.${message.guild.id}`) === true) {
     message.channel.send(`Kod yetkili rolü başarıyla kaldırıldı`)
     db.delete(`kodyetkiliR.${message.guild.id}`)
     return
}
  message.channel.send(`Kod yetkili rolü ayarlanmamış.`)
    return
 
  }
   
 
    if (!rol) {
      let e = new Discord.MessageEmbed()
      .setDescription('Lütfen bir rol adı yazınız veya etiketleyiniz')
      .setColor(client.conf.renk)
      message.channel.send(e)
      return;
    }
 
    var s = db.set(`kodyetkiliR.${message.guild.id}`, rol.id)
 
    const embed = new Discord.MessageEmbed()
 
    .setDescription(`Kod yetkili rolü başarıyla ayarlandı: ${rol}\Kod yetkili rolünü silmek için **${prefix}kod-yetkili-rol kapat** yazmanız yeterlidir.`)
    .setColor(client.conf.renk)
    message.channel.send({embed})
}
 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kodyetkili-rol","kodyetkili-rol-ayarla","kodyetkilirol","kodyetkili-ayarla","kodyetkili","kodyetkiliayarla"],
    permLevel: 0,
    kategori: "kodyetkili",
 
  };
 
  exports.help = {
    name: 'kodyetkili-rol-ayarla',
    description: 'Gelişmiş kodyetkili Sistemindeki kodyetkili ekibi rolünü değiştirmenizi sağlar.',
    usage: 'kodyetkili-rol-ayarla <@rol>',
   
  };