# Creating the templates Collection:
StudyTemplatesDict = {
    "templateA": {
        "_id": "templateA",
        "templateName": "תבנית א'",
        "degree": "הנדסת תעשייה וניהול",
        "years": {
            "yearA": {
                "semesterA": [
                    {"courseID": "14213141", "courseName": "כלכלה להנדסת תעשייה וניהול", "credits": 3.5},
                    {"courseID": "20119711", "courseName": "חדו\"א 1 להנדסה", "credits": 5.0},
                    {"courseID": "36411011", "courseName": "מבוא להנדסת תעשייה וניהול", "credits": 1.0},
                    {"courseID": "36411301", "courseName": "מבוא לתכנות", "credits": 4.0},
                    {"courseID": "36412041", "courseName": "גרפיקה הנדסית", "credits": 1.5},
                    {"courseID": "36414141", "courseName": "יסודות מערכות מידע", "credits": 3.0}
                ],
                "semesterB": [
                    {"courseID": "20119321", "courseName": "אלגברה לינארית להנדסה", "credits": 4.5},
                    {"courseID": "20119621", "courseName": "חדו\"א 2 להנדסת תעשייה וניהול", "credits": 4.0},
                    {"courseID": "20119661", "courseName": "מבוא למתמטיקה דיסקרטית", "credits": 3.5},
                    {"courseID": "20311391", "courseName": "פיסיקה 1", "credits": 3.5},
                    {"courseID": "36411421", "courseName": "פיתוח תוכנה מונחה עצמים", "credits": 3.5},
                    {"courseID": "68114021", "courseName": "מבוא לחשבונאות פיננסית וניהולית", "credits": 3.5}
                ]
            },
            "yearB": {
                "semesterA": [
                    {"courseID": "20119481", "courseName": "משוואות דיפרנציאליות רגילות להנדסת תעשייה וניהול", "credits": 3.5},
                    {"courseID": "20311491", "courseName": "פיסיקה 2", "credits": 3.5},
                    {"courseID": "36411041", "courseName": "מבוא להסתברות", "credits": 3.5},
                    {"courseID": "36411211", "courseName": "מבוא להנדסת מכונות ותהליכי ייצור", "credits": 3.5},
                    {"courseID": "36411901", "courseName": "בסיסי נתונים", "credits": 3.5},
                    {"courseID": "36413051", "courseName": "חקר ביצועים 1", "credits": 3.5}
                ],
                "semesterB": [
                    {"courseID": "36411191", "courseName": "יסודות האלגוריתמים והסיבוכיות", "credits": 3.5},
                    {"courseID": "36411291", "courseName": "אמידה ומבחני השערות", "credits": 3.5},
                    {"courseID": "36411411", "courseName": "ניתוח ועיצוב מערכות מידע", "credits": 3.5},
                    {"courseID": "36413031", "courseName": "תכנון ופיקוח על הייצור 1", "credits": 4.0},
                    {"courseID": "36413061", "courseName": "חקר ביצועים 2", "credits": 3.5},
                    {"courseID": "36413151", "courseName": "מבוא להנדסת מערכות ספרתיות וחשמל", "credits": 3.5},
                    {"courseID": "36413241", "courseName": "סדנת כתיבה ומיומנויות למידה", "credits": 0.5}
                ]
            },
            "yearC": {
                "semesterA": [
                    {"courseID": "36411251", "courseName": "ניהול פרויקטים", "credits": 3.0},
                    {"courseID": "36411721", "courseName": "הנדסת שיטות ותהליכים ארגוניים", "credits": 4.0},
                    {"courseID": "36413041", "courseName": "תכנון ופיקוח על הייצור 2", "credits": 3.5},
                    {"courseID": "36413321", "courseName": "אוטומציה וייצור ממוחשב", "credits": 4.0},
                    {"courseID": "68115081", "courseName": "יסודות המימון", "credits": 3.0},
                    {"courseID": "36411841", "courseName": "תשתית טכנולוגיות מידע", "credits": 3.0},
                    {"courseID": "36411081", "courseName": "האינטרנט של הדברים בתעשייה", "credits": 3.0}
                ],
                "semesterB": [
                    {"courseID": "36411061", "courseName": "מודלים ברגרסיה ליניארית", "credits": 3.5},
                    {"courseID": "36411501", "courseName": "סדנת מיומנויות בתקשורת בינאישית", "credits": 0.5},
                    {"courseID": "36411781", "courseName": "ניהול שרשראות אספקה", "credits": 3.0},
                    {"courseID": "36413091", "courseName": "סימולציה", "credits": 4.0},
                    {"courseID": "36414241", "courseName": "מבוא לקבלת החלטות", "credits": 3.0},
                    {"courseID": "36414311", "courseName": "מבוא להנדסת גורמי אנוש", "credits": 3.0},
                    {"courseID": "36411171", "courseName": "מערכות בינה עסקית (BI)", "credits": 3.0},
                    {"courseID": "36411151", "courseName": "ניהול קשרי לקוחות (CRM)", "credits": 3.0}
                ]
            },
            "yearD": {
                "semesterA": [
                    {"courseID": "36411091", "courseName": "הנדסת איכות", "credits": 3.5},
                    {"courseID": "36414091", "courseName": "פרויקט מסכם א", "credits": 3.0},
                    {"courseID": "364.1.1911", "courseName": "אסטרטגיה וניהול של מערכות מידע", "credits": 3.0},
                    {"courseID": "36411441", "courseName": "יסודות בינה מלאכותית", "credits": 3.0},
                    {"courseID": "36413309", "courseName": "ניהול ידע (KM)", "credits": 3.0},
                    {"courseID": "36411381", "courseName": "בניית מערכות ממוחשבות מבוססות אינטרנט (WEB)", "credits": 3.0},
                    {"courseID": "16710262", "courseName": "דילמות מקום המדינה ועד היום", "credits": 2.0},
                    {"courseID": "12410060", "courseName": "גני עדן מלאכותיים: סמים וחברה במזה\"ת", "credits": 2.0}
                ],
                "semesterB": [
                    {"courseID": "36414101", "courseName": "פרויקט מסכם ב", "credits": 5.0},
                    {"courseID": "68112071", "courseName": "ניהול משאבי אנוש", "credits": 3.0},
                    {"courseID": "68110049", "courseName": "עקרונות השיווק", "credits": 3.0},
                    {"courseID": "36411811", "courseName": "למידת מכונה", "credits": 3.0},
                    {"courseID": "36414381", "courseName": "יישומים ארגוניים של טכנולוגיות מידע (ERP)", "credits": 3.0},
                    {"courseID": "36414351", "courseName": "ניתוח נתונים פיננסיים", "credits": 3.0},
                    {"courseID": "36412020", "courseName": "ניהול מוצרים עתירי טכנולוגיה", "credits": 3.0},
                    {"courseID": "36411071", "courseName": "תכנון ניסויים וניתוח שונות", "credits": 3.0},
                    {"courseID": "12410430", "courseName": "בימת המזרח התיכון: היבטים חברתיים ופוליטיים של סכסוכים", "credits": 2.0}
                ]
            }
        }
    },
    "templateB": {
        "_id": "templateB",
        "templateName": "תבנית ב'",
        "degree": "הנדסת תעשייה וניהול",
        "years": {
            "yearA": {
                "semesterA": [
                    {"courseID": "20119711", "courseName": "חדו\"א 1 להנדסה", "credits": 5.0},
                    {"courseID": "20119321", "courseName": "אלגברה לינארית להנדסה", "credits": 4.5},
                    {"courseID": "20119661", "courseName": "מבוא למתמטיקה דיסקרטית", "credits": 3.5},
                    {"courseID": "36411011", "courseName": "מבוא להנדסת תעשייה וניהול", "credits": 1.0},
                    {"courseID": "68114021", "courseName": "מבוא לחשבונאות פיננסית וניהולית", "credits": 3.0}
                ],
                "semesterB": [
                    {"courseID": "20119481", "courseName": "משוואות דיפרנציאליות רגילות להנדסת תעשייה וניהול","credits": 3.5},
                    {"courseID": "20119621", "courseName": "חדו\"א 2 להנדסת תעשייה וניהול", "credits": 4.0},
                    {"courseID": "36411041", "courseName": "מבוא להסתברות", "credits": 3.5},
                    {"courseID": "36411301", "courseName": "מבוא לתכנות", "credits": 4.0},
                    {"courseID": "36412041", "courseName": "גרפיקה הנדסית", "credits": 1.5},
                    {"courseID": "36413051", "courseName": "חקר ביצועים 1", "credits": 3.5},
                    {"courseID": "36414141", "courseName": "יסודות מערכות מידע", "credits": 3.0}
                ]
            },
            "yearB": {
                "semesterA": [
                    {"courseID": "20311391", "courseName": "פיזיקה 1", "credits": 3.5},
                    {"courseID": "36411191", "courseName": "יסודות האלגוריתמים והסיבוכיות", "credits": 3.5},
                    {"courseID": "36411291", "courseName": "אמידה ומבחני השערות", "credits": 3.5},
                    {"courseID": "36411421", "courseName": "פיתוח תוכנה מונחה עצמים", "credits": 3.5},
                    {"courseID": "36413031", "courseName": "תכנון ופיקוח על הייצור 1", "credits": 4.0},
                    {"courseID": "36413061", "courseName": "חקר ביצועים 2", "credits": 3.5},
                    {"courseID": "36413241", "courseName": "סדנת כתיבה ומיומנויות למידה", "credits": 0.5}
                ],
                "semesterB": [
                    {"courseID": "14213141", "courseName": "כלכלה להנדסת תעשייה וניהול", "credits": 3.5},
                    {"courseID": "20311491", "courseName": "פיסיקה 2", "credits": 3.5},
                    {"courseID": "36411211", "courseName": "מבוא להנדסת מכונות ותהליכי ייצור", "credits": 3.5},
                    {"courseID": "36411721", "courseName": "הנדסת שיטות ותהליכים ארגוניים", "credits": 4.0},
                    {"courseID": "36411901", "courseName": "בסיסי נתונים", "credits": 3.5},
                    {"courseID": "36413041", "courseName": "תכנון ופיקוח על הייצור 2", "credits": 4.0}
                ]
            },
            "yearC": {
                "semesterA": [
                    {"courseID": "36411061", "courseName": "מודלים ברגרסיה ליניארית", "credits": 3.5},
                    {"courseID": "36411501", "courseName": "סדנת מיומנויות בתקשורת בינאישית", "credits": 0.5},
                    {"courseID": "36411411", "courseName": "ניתוח ועיצוב מערכות מידע", "credits": 3.5},
                    {"courseID": "36413091", "courseName": "סימולציה", "credits": 4.0},
                    {"courseID": "36413151", "courseName": "מבוא להנדסת חשמל ומערכות ספרתיות", "credits": 3.5},
                    {"courseID": "36414241", "courseName": "מבוא לקבלת החלטות", "credits": 3.0},
                    {"courseID": "36414311", "courseName": "מבוא להנדסת גורמי אנוש", "credits": 3.0}
                ],
                "semesterB": [
                    {"courseID": "36411091", "courseName": "הנדסת איכות", "credits": 3.5},
                    {"courseID": "36411251", "courseName": "ניהול פרויקטים", "credits": 3.0},
                    {"courseID": "36413321", "courseName": "אוטומציה וייצור ממוחשב", "credits": 4.0},
                    {"courseID": "68115081", "courseName": "יסודות המימון", "credits": 3.0},
                    {"courseID": "36411841", "courseName": "תשתית טכנולוגיות מידע", "credits": 3.0},
                    {"courseID": "36411081", "courseName": "האינטרנט של הדברים בתעשייה", "credits": 3.0},
                    {"courseID": "36411171", "courseName": "מערכות בינה עסקית (BI)", "credits": 3.0}
                ]
            },
            "yearD": {
                "semesterA": [
                    {"courseID": "36411781", "courseName": "ניהול שרשראות אספקה", "credits": 3.0},
                    {"courseID": "36414091", "courseName": "פרויקט מסכם א", "credits": 3.0},
                    {"courseID": "364.1.1911", "courseName": "אסטרטגיה וניהול של מערכות מידע", "credits": 3.0},
                    {"courseID": "36411441", "courseName": "יסודות בינה מלאכותית", "credits": 3.0},
                    {"courseID": "36411811", "courseName": "למידת מכונה", "credits": 3.0},
                    {"courseID": "36414381", "courseName": "יישומים ארגוניים של טכנולוגיות מידע (ERP)", "credits": 3.0},
                    {"courseID": "36411071", "courseName": "תכנון ניסויים וניתוח שונות", "credits": 3.0},
                    {"courseID": "16710262", "courseName": "דילמות מקום המדינה ועד היום", "credits": 2.0},
                    {"courseID": "12410060", "courseName": "גני עדן מלאכותיים: סמים וחברה במזה\"ת", "credits": 2.0}
                ],
                "semesterB": [
                    {"courseID": "36414101", "courseName": "פרויקט מסכם ב", "credits": 5.0},
                    {"courseID": "68112071", "courseName": "ניהול משאבי אנוש", "credits": 3.0},
                    {"courseID": "68110049", "courseName": "עקרונות השיווק", "credits": 3.0},
                    {"courseID": "36414351", "courseName": "ניתוח נתונים פיננסיים", "credits": 3.0},
                    {"courseID": "36412020", "courseName": "ניהול מוצרים עתירי טכנולוגיה", "credits": 3.0},
                    {"courseID": "12410430", "courseName": "בימת המזרח התיכון: היבטים חברתיים ופוליטיים של סכסוכים", "credits": 2.0}
                ]
            }
        }
    }
}