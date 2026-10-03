const {test} = require('node:test');
const assert = require('node:assert/strict');
const {VerdictRequestSchema} = require('../lib/types');
const request = {first_name:'Test',contact_email:' PERSON@EXAMPLE.COM ',contact_phone:'06 12 34 56 78'};
test('email obligatoire et téléphone facultatif avant le résultat',()=>{
  assert.equal(VerdictRequestSchema.safeParse({first_name:'Test'}).success,false);
  assert.equal(VerdictRequestSchema.safeParse({...request,contact_email:''}).success,false);
  assert.equal(VerdictRequestSchema.safeParse({...request,contact_phone:''}).success,true);
  assert.equal(VerdictRequestSchema.safeParse({...request,contact_phone:undefined}).success,true);
});
test('normalise les identités utilisées pour le dédoublonnage',()=>{
 const parsed=VerdictRequestSchema.parse(request);
 assert.equal(parsed.contact_email,'person@example.com');
 assert.equal(parsed.contact_phone,'+33612345678');
 for (const phone of ['+33612345678','0033612345678','+33 (0)6 12 34 56 78']) assert.equal(VerdictRequestSchema.parse({...request,contact_phone:phone}).contact_phone,'+33612345678');
 assert.equal(VerdictRequestSchema.parse({...request,contact_phone:'+41 79 123 45 67'}).contact_phone,'+41791234567');
});
test('rejette les coordonnées invalides côté serveur',()=>{
 for(const contact_email of ['invalide','a@','a@b']) assert.equal(VerdictRequestSchema.safeParse({...request,contact_email}).success,false);
 for(const contact_phone of ['000000000','123','bonjour123456789','+1234567890123456']) assert.equal(VerdictRequestSchema.safeParse({...request,contact_phone}).success,false);
});
