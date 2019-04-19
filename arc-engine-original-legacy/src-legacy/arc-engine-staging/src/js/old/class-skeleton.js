'use strict';

class Skeleton
{
  constructor ( params ) // scene, world, resource
  {

    this.uuid = generateUUID( 'skeleton' );

    this.bones = [];
    this.joints = [];

    try {
      this.loadSkeleton( params.resource ).then( ( response ) => {

        let myJSON = JSON.parse( response );
        console.log( 'Before', myJSON );

        for ( let x in myJSON.bones )
        {
          this.bones.push( myJSON.bones[x] );
          this.bones[x].name = `${ this.uuid }-${ this.bones[x].name.toUpperCase( ) }`
          this.bones[x].entity = this.generateBoneEntity( this.bones[x], params.scene, params.world );
        }

        for ( let x in myJSON.joints )
        {
          this.joints.push( myJSON.joints[x] );
          this.joints[x].boneA = this.joints[x].boneA.toUpperCase( );
          this.joints[x].boneB = this.joints[x].boneB.toUpperCase( );
          this.joints[x].name = `${this.uuid}-JOINT-${this.joints[x].boneA}-${this.joints[x].boneB}`;
          this.joints[x].oimo = this.generateJoint( myJSON.joints[x], params.world );
        }

        /* TEMP TESTING - Begin */

        this.removeJoint( params.world, params.world.getByName( this.uuid + '-JOINT-HIPCENTER-TORSOLOWER' ) );
        this.removeJoint( params.world, params.world.getByName( this.uuid + '-JOINT-SHOULDERCENTER-SHOULDERLEFT' ) );
/*
        this.getJointByID(
          this.uuid + '-JOINT-HIPCENTER-TORSOLOWER'
        ).oimo = this.generateJoint(
          this.getJointByID( this.uuid + '-JOINT-HIPCENTER-TORSOLOWER' ),
          params.world
        );

        this.getJointByID(
          this.uuid + '-JOINT-SHOULDERCENTER-SHOULDERLEFT'
        ).oimo = this.generateJoint(
          this.getJointByID( this.uuid + '-JOINT-SHOULDERCENTER-SHOULDERLEFT' ),
          params.world
        );
        */

        // this.setSleeping( );

        this.setAnimated( params.world );
        // this.setAnimated( params.world );

        // this.setRagDoll( params.world );

        /* TEMP TESTING - End */

        console.log( 'after', this );

      } );
    } catch ( e ) {
      console.log( e );
    }

  }

  generateBone ( params ) // { name, params.vertA, params.vertB } // TODO: Make this method configure to the new template
  {
    let myCenter;
    let myRotation;
    let myLength;

    let vertA = new THREE.Vector3( ).fromArray( params.vertA );
    let vertB = new THREE.Vector3( ).fromArray( params.vertB );

    myCenter = new THREE.Vector3( );
    myCenter.copy( vertA );
    myCenter.add( vertB );
    myCenter.divide( new THREE.Vector3( 2, 2, 2 ) );

    myLength = vertA.distanceTo( vertB );

    myRotation = new THREE.Quaternion( );
    let directionVec = new THREE.Vector3( ).copy( vertB );
    directionVec.sub( vertA );
    directionVec.normalize( );
    myRotation.setFromUnitVectors( new THREE.Vector3( 0, 1, 0 ), directionVec );
    myRotation = new THREE.Euler( ).setFromQuaternion( myRotation, 'YXZ' );

    myRotation.x = myRotation.x / Math.PI * 180;
    myRotation.y = myRotation.y / Math.PI * 180;
    myRotation.z = myRotation.z / Math.PI * 180;

    return { "name":params.name, "vertA":params.vertA, "vertB":params.vertB, "center":myCenter, "rotation":myRotation, "length":myLength };
  }

  generateBoneEntity ( myBone, myScene, myWorld )
  {
    let boneOimoGen = { oimo:{
      "type":"box",
      "size":myBone.dimensions,
      "pos":myBone.center,
      "physicsed":true,
      "world":myWorld,
      "name":myBone.name,
      "rotation":[0, 0, 0]//,
      //"belongsTo":0x000002,
      //"collidesWith":0x000001
    } };
    let myColor;
    if ( boneOimoGen.oimo.name == this.uuid + '-LEGUPPERLEFT' ) { myColor = 0x0000dd; }
    if ( boneOimoGen.oimo.name == this.uuid + '-LEGUPPERRIGHT' ) { myColor = 0x0000dd; }
    if ( boneOimoGen.oimo.name == this.uuid + '-LEGLOWERLEFT' ) { myColor = 0x0000ff; }
    if ( boneOimoGen.oimo.name == this.uuid + '-LEGLOWERRIGHT' ) { myColor = 0x0000ff; }
    if ( boneOimoGen.oimo.name == this.uuid + '-HIPLEFT' ) { myColor = 0xffffff; }
    if ( boneOimoGen.oimo.name == this.uuid + '-HIPRIGHT' ) { myColor = 0xffffff; }
    if ( boneOimoGen.oimo.name == this.uuid + '-HIPCENTER' ) { myColor = 0xffffff; }
    if ( boneOimoGen.oimo.name == this.uuid + '-TORSOLOWER' ) { myColor = 0x000000; }
    if ( boneOimoGen.oimo.name == this.uuid + '-TORSOMIDDLE' ) { myColor = 0x222222; }
    if ( boneOimoGen.oimo.name == this.uuid + '-TORSOUPPER' ) { myColor = 0x444444; }
    if ( boneOimoGen.oimo.name == this.uuid + '-SHOULDERCENTER' ) { myColor = 0xffffff; }
    if ( boneOimoGen.oimo.name == this.uuid + '-SHOULDERLEFT' ) { myColor = 0xffffff; }
    if ( boneOimoGen.oimo.name == this.uuid + '-SHOULDERRIGHT' ) { myColor = 0xffffff; }
    if ( boneOimoGen.oimo.name == this.uuid + '-ARMUPPERLEFT' ) { myColor = 0xdd0000; }
    if ( boneOimoGen.oimo.name == this.uuid + '-ARMUPPERRIGHT' ) { myColor = 0xdd0000; }
    if ( boneOimoGen.oimo.name == this.uuid + '-ARMLOWERLEFT' ) { myColor = 0xff0000; }
    if ( boneOimoGen.oimo.name == this.uuid + '-ARMLOWERRIGHT' ) { myColor = 0xff0000; }
    if ( boneOimoGen.oimo.name == this.uuid + '-NECK' ) { myColor = 0x666666; }
    if ( boneOimoGen.oimo.name == this.uuid + '-HEAD' ) {
      myColor = 0x888888;
      // boneOimoGen.oimo.physicsed = true; console.log( 'Target Oimo Below' );
    }
    return new Entity( {
      'three':{
        'scene':myScene,
        'geometry':new THREE.BoxGeometry( myBone.dimensions[0], myBone.dimensions[1], myBone.dimensions[2] ),
        'material':new THREE.MeshPhongMaterial( { color:myColor } )
      },
      'oimo':boneOimoGen.oimo
    } );
  }

  generateJoint ( myJointParams, myWorld ) // myJointParams{ pointA, pointB, axis, min, max }
  {
    let jointName = `${this.uuid}-JOINT-${myJointParams.boneA}-${myJointParams.boneB}`;

    if ( !myWorld.getByName( jointName ) )
    {
      return myWorld.add( {
        name:jointName,
        type:'jointHinge',
        body1:`${this.uuid}-${myJointParams.boneA}`,
        body2:`${this.uuid}-${myJointParams.boneB}`,
        axe1:myJointParams.axis.a || myJointParams.axis, // Axis, Scales Min/Max
        axe2:myJointParams.axis.b || myJointParams.axis,
        pos1:myJointParams.pointA, // Position Relative
        pos2:myJointParams.pointB,
        min:myJointParams.min, // Bottom of Rotation [DEG]
        max:myJointParams.max, // Top of Rotation [DEG]
        spring:[100,0.3] // Spring Force
      } );
    }
    else
    {
      return myJointParams.oimo;
    }


  }

  removeJoint ( myWorld, myJoint )
  {
    if ( myJoint.oimo )
    {
      delete this.getJointByID( myJoint.name ).oimo;
      if ( myWorld.getByName( myJoint.name ) )
      { myWorld.getByName( myJoint.name ).dispose( ); }
    }
  }

  getBoneByID ( myBoneID )
  {
    for ( let x in this.bones )
    {
      if ( this.bones[x].name == myBoneID )
      { return this.bones[x]; }
    }
  }

  getJointByID ( myJointID )
  {
    for ( let x in this.joints )
    {
      if ( this.joints[x].name == myJointID )
      { return this.joints[x]; }
    }
  }

  setAwake ( )
  {
    for ( let x in this.bones )
    {
      if ( this.bones[x].entity.oimo )
      {
        this.bones[x].entity.oimo.awake( );
        this.bones[x].entity.mesh.material.transparent = false;
        this.bones[x].entity.mesh.material.opacity = 1;
      }
    }
  }

  setSleep ( )
  {
    for ( let x in this.bones )
    {
      if ( this.bones[x].entity.oimo )
      {
        this.bones[x].entity.oimo.sleep( );
        this.bones[x].entity.mesh.material.transparent = true;
        this.bones[x].entity.mesh.material.opacity = 0.5;
      }
    }
  }

  setRagDoll ( myWorld, resetJoints = false )
  {
    let boneOimoGenA;
    let boneOimoGenB;

    let myBoneA;
    let myBoneB;

    for ( let x in this.joints )
    {
      myBoneA = this.getBoneByID( `${this.uuid}-${this.joints[x].boneA}` );
      myBoneB = this.getBoneByID( `${this.uuid}-${this.joints[x].boneB}` );

      if ( !myBoneA.entity.oimo )
      {
        boneOimoGenA = {
          "type":"box",
          "size":myBoneA.dimensions,
          "pos":myBoneA.entity.mesh.position.toArray( ),
          "physicsed":true,
          "world":myWorld,
          "name":myBoneA.name,
          "rotation":[
            Math.degrees( myBoneA.entity.mesh.rotation.x ),
            Math.degrees( myBoneA.entity.mesh.rotation.y ),
            Math.degrees( myBoneA.entity.mesh.rotation.z )
          ]
        };
        myBoneA.entity.generateOimo( boneOimoGenA );
      }

      if ( !myBoneB.entity.oimo )
      {
        boneOimoGenA = {
          "type":"box",
          "size":myBoneB.dimensions,
          "pos":myBoneB.entity.mesh.position.toArray( ),
          "physicsed":true,
          "world":myWorld,
          "name":myBoneB.name,
          "rotation":[
            Math.degrees( myBoneB.entity.mesh.rotation.x ),
            Math.degrees( myBoneB.entity.mesh.rotation.y ),
            Math.degrees( myBoneB.entity.mesh.rotation.z )
          ]
        };
        myBoneB.entity.generateOimo( boneOimoGenA );
      }
      if ( this.joints[x].wasJoint || !this.joints[x].oimo && resetJoints )
      { this.joints[x].oimo = this.generateJoint( this.joints[x], myWorld ); this.joints[x].wasJoint = false; }
    }
    console.log( "rag-doll" );
  }

  setAnimated ( myWorld )
  {
    for ( let x in this.bones )
    {
      if ( this.bones[x].entity.oimo )
      { this.bones[x].entity.removeOimo( myWorld ); }
    }
    for ( let x in this.joints )
    {
      if ( this.joints[x].oimo )
      { this.joints[x].wasJoint = true; this.removeJoint( myWorld, this.joints[x] ); }
    }
    console.log( 'animated' );
  }

  setOriginalLocation ( )
  {
    for ( let x in this.bones )
    {
      if ( this.bones[x].entity.oimo )
      { this.bones[x].entity.oimo.resetPosition( this.bones[x].center[0], this.bones[x].center[1], this.bones[x].center[2] ); }
      else
      { this.bones[x].entity.mesh.position.fromArray( this.bones[x].center )}
    }
  }

  setOriginalRotation ( )
  {
    for ( let x in this.bones )
    {
      if ( this.bones[x].entity.oimo )
      { this.bones[x].entity.oimo.resetRotation( 0, 0, 0 ); }
      else
      { this.bones[x].entity.mesh.rotation.set( 0, 0, 0 ); }
    }
  }

  loadSkeleton ( myURL )
  {
    return new Promise( (resolve, reject) => {
      ajax.get( myURL, '', function( response ) {
        if ( response.status.toString()[0] == 2 )
        { resolve( response.responseText ); }
        else
        { reject( response.status.toString() ); }
      } );
    } );
  }
}
