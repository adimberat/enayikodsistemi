const Discord = require('discord.js');

exports.run = async (client, message,args) => {


  const db = require('quick.db');
  

  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.conf.prefix;
	const secenekler = args.slice(0).join(' ');

   
if(!args[0]) return message.channel.send(`lütfen aç veya kapat yaz.`)

  
	if (secenekler === "aç" || secenekler === "on") {
		const yetki = new Discord.MessageEmbed()
		.setAuthor(client.conf.botadı, client.avatarURL)
		.setColor(client.conf.renk)
		.setDescription(`Bu komutu kullanabilmek için Sunucuyu Yönet yetkisine sahip olmalısın!`)
	  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(yetki)
    
db.set(`kodsistemi.${message.guild.id}`, "acik")
    
		  const embed = new Discord.MessageEmbed()
    .setColor(client.conf.renk)
    .setDescription(`kod sistemi başarıyla açıldı\nkod sistemini kapatmak isterseniz **${prefix}kod-sistemi kapat** yazmanız yeterlidir.`)
    message.channel.send(embed)

	};

	if (secenekler === "kapat" || secenekler === "off" || secenekler === "sıfırla") {
        const yetki = new Discord.MessageEmbed()
    .setAuthor(client.conf.botadı, client.avatarURL)
    .setColor(client.conf.renk)
    .setDescription(`Bu komutu kullanabilmek için Sunucuyu Yönet yetkisine sahip olmalısın!`)
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(yetki)
    
	db.delete(`kodsistemi.${message.guild.id}`)
	db.delete(`kodyetkiliR.${message.guild.id}`)
	db.delete(`kodK.${message.guild.id}`)
	db.delete(`kodJS.${message.guild.id}`)
	db.delete(`kodJSP.${message.guild.id}`)
	db.delete(`kodALT.${message.guild.id}`)
    
		message.channel.send('kod sistemi kapatıldı ve bütün veriler silindi')
    
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['kod-sistemi','kodsistemi','kod-sistem'],
		permLevel: 0,
    kategori: "kod",
	};
	  
	exports.help = {
		name: 'kodsistem',
		description: 'kod sistemini açıp kapatmanızı sağlar.',
		usage: 'küfür-engelle <aç/kapat>',
    
	};