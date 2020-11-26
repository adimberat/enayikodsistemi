const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.conf.prefix;
    let sistem = db.fetch(`kodsistemi.${message.guild.id}`)
    const acikdegil = new Discord.MessageEmbed()
    .setAuthor(client.conf.botadı, client.avatarURL)
    .setColor(client.conf.renk)
    .setDescription(`Bu komutu kullanabilmek için kod sistemini açman gerekiyor! ${prefix}kod-sistemi aç`)
  if(!sistem) return message.channel.send(`sistemi açsana moruk ${prefix}kod-sistemi aç`)
let kategori = message.guild.channels.cache.find(r => r.id === db.fetch(`kodJSP.${message.guild.id}`))
let yetkilirol = db.fetch(`kodyetkiliR.${message.guild.id}`)
if(!db.fetch(`kodK.${message.guild.id}`)) return message.channel.send(`Kod logunu ayarlamalisin!`)
let log = client.channels.cache.get(db.fetch(`kodK.${message.guild.id}`))


if(!yetkilirol) return message.channel.send(`Sistemi düzgün ayarlayamamışsınız lütfen tekrar ayarlarını yapın!`)
if(!kategori) return message.channel.send(`Sistemi düzgün ayarlayamamışsınız lütfen tekrar ayarlarını yapın!`)

if(!message.member.roles.cache.has(yetkilirol)) return message.channel.send("Yetkin yok!")
let everyone = message.guild.roles.cache.find(r => r.name === `@everyone`);
if(!args[0] || !args[1] || !args[2]) return message.channel.send(`Lütfen komutu doğru kullanınız!\nÖrnek kullanım: ${prefix}jsp <kod-adı> - <kod-main>\nEğer kodun main veya komut kısmı yok ise - yazınız!`)
message.guild.channels.create(args[0], {type: 'text'}).then(kanal => {
  message.channel.send(`Kod kanalini olusturdum iste kanalin! <#${kanal.id}>`)
    kanal.setParent(kategori.id)
    kanal.overwritePermissions([
      {
        id: everyone.id,
        deny: ['SEND_MESSAGES'], 
      },    
      {
        id: yetkilirol,
        allow: ['SEND_MESSAGES', "MANAGE_CHANNELS"],
      },
    ])  
    kanal.send(new Discord.MessageEmbed()
.setAuthor(`${args[0]} adlı kod paylaşıldı!`)
.setDescription(`<:tutbunu:781597584363225088> **Kod hakkında**
<:tutbunu:781597584363225088> Yetkili isim \`${message.author.tag}\`
<:tutbunu:781597584363225088> Yetkili id \`${message.author.id}\`
<:tutbunu:781597584363225088> Kod main linki [maine fırla](${args[1]})
<:tutbunu:781597584363225088> Kod komut linki [koda fırla](${args[2]})`)
.setColor(client.conf.renk))
  })
log.send(new Discord.MessageEmbed()
.setAuthor(`${args[0]} adlı kod paylaşıldı!`)
.setDescription(`<:tutbunu:781597584363225088> **Kod hakkında**
<:tutbunu:781597584363225088> Yetkili isim \`${message.author.tag}\`
<:tutbunu:781597584363225088> Yetkili id \`${message.author.id}\`
<:tutbunu:781597584363225088> Kod main linki [maine fırla](${args[1]})
<:tutbunu:781597584363225088> Kod komut linki [koda fırla](${args[2]})`)
.setColor(client.conf.renk))

}


    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["jsppaylaş"],
        permLevel: 0,
        kategori: "kodyetkili",
     
      };
     
      exports.help = {
        name: 'jsp',
        description: 'Gelişmiş kodyetkili Sistemindeki kodyetkili ekibi rolünü değiştirmenizi sağlar.',
        usage: 'kodyetkili-rol-ayarla <@rol>',
       
      };