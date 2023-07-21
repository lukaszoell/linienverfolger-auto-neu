let lastWhite = 0
let lastBlack = 0
music.play(music.stringPlayable("C D E F G A B C5 ", 120), music.PlaybackMode.UntilDone)
basic.showIcon(IconNames.Happy)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
basic.forever(function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        if (control.millis() - lastBlack > 600) {
            maqueen.motorStop(maqueen.Motors.All)
        }
        if (lastBlack == 0) {
            lastBlack = control.millis()
        }
        lastWhite = 0
    } else {
        lastBlack = 0
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 128)
            lastWhite = 0
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 128)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            lastWhite = 0
        } else {
            if (lastWhite == 0) {
                lastWhite = control.millis()
            } else {
                if (control.millis() - lastWhite > 600) {
                    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
                }
            }
        }
    }
})
