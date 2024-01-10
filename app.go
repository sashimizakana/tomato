package main

import (
	"context"
	"log"

	"golang.org/x/text/encoding/japanese"
	"golang.org/x/text/transform"
	"gopkg.in/toast.v1"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func convertString(s string) string {
	t := japanese.ShiftJIS.NewEncoder()
	sjisStr, _, err := transform.String(t, s)
	if err != nil {
		log.Fatal(err)
	}
	return sjisStr
}

func (a *App) Message(message string) error {
	notification := toast.Notification{
		AppID:   "Tomato",
		Title:   convertString("通知"),
		Message: convertString(message),
	}
	return notification.Push()
}
