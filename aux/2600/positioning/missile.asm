MISSILE_COLOR = $2A

	MAC SETUP
	LDA #$00
    STA NUSIZ0
    LDA #MISSILE_COLOR
    STA COLUP0
    LDA #$02
    STA ENAM0
	ENDM

	MAC RESP_SPRITE
	STA RESM0
	ENDM

	INCLUDE main.inc