class SeeThroughEffect{
    constructor(canvas,video,color){
        this.canvas=canvas;
        this.color=color;
        this.video=video;
        this.ctx=canvas.getContext("2d")
        this.animate();
    }

    animate(){
        this.ctx.drawImage(this.video,0,0,this.canvas.width,this.canvas.height);

        this.makeSeeThrough();
        
        requestAnimationFrame(this.animate.bind(this))
    }

    makeSeeThrough(){
        const imgData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
        const data = imgData.data;
       
        
       const threshold=130;
       for(let i=0;i<data.length;i+=4){
        const r=data[i];
        const g=data[i+1];
        const b=data[i+2];

        if(colorMatch([r,g,b],this.color,threshold)){
            const alpha = distance([r,g,b],this.color);
            imgData.data[i+3]=alpha;
        }
       }
       this.ctx.putImageData(imgData,0,0)
    }
}