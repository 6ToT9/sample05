AFRAME.registerComponent('gltf_shadow', {
  init: function () {
    this.enableShadow();
    this.el.addEventListener('object3dset', this.enableShadow.bind(this));
  },
  enableShadow: function () {
    const mesh = this.el.getObject3D('mesh');
    if (!mesh) return;
    mesh.traverse(function (node) {
      console.log(node);
      /*こちらは無くても表示上は問題ないが、内包されるメッシュと矛盾したくないのでセット*/
      if(node.type=="Group"){
        node.castShadow=true;
        node.receiveShadow=true;
      }
      /*メッシュの設定でcast/recvして、再計算をしかける*/
      if(node.type=="Mesh"){
        node.castShadow=true;
        node.receiveShadow=true;
        node.material.shadowSide=THREE.FrontSide;//両面にしないとつきやぶるときがある
        node.material.side=THREE.FrontSide;//両面にしないとつきやぶるときがある
        
        node.material.needsUpdate=true; //(shadowの設定かえるだけならここは要らない, ついでに他のmaterial設定変えるなら)
        node.geometry.computeVertexNormals();//影の計算にnormalの再計算が必要//デフォルトがshadowを使ってなかったので
      }
    });
  }
});
