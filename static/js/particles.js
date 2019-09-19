window.onload = function () {
    var color = '#030829';
    var maxParticles = 95;

    Particles.init({
        'selector': '.background',
        color: color,
        maxParticles: maxParticles,
        sizeVariations: 30,
        connectParticles: true,
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 45
                }
            }, {
                breakpoint: 375,
                options: {
                    maxParticles: 22
                }
            }
        ]
    });
};