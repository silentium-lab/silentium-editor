package pw.silentium.editor;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "SAFPlugin")
public class SAFPlugin extends Plugin {
    static {
        android.util.Log.e("SAFPlugin", "SAFPlugin class LOADED");
    }
    
    @PluginMethod
    public void chooseFile(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*");
        intent.addFlags(
            Intent.FLAG_GRANT_READ_URI_PERMISSION |
            Intent.FLAG_GRANT_WRITE_URI_PERMISSION |
            Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION
        );

        startActivityForResult(call, intent, "pickFileResult");
    }

    @ActivityCallback
    public void pickFileResult(PluginCall call, ActivityResult result) {
        if (call == null) return;

        if (result.getResultCode() == Activity.RESULT_OK && result.getData() != null) {
            Uri uri = result.getData().getData();

            getContext().getContentResolver().takePersistableUriPermission(
                uri,
                Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION
            );

            JSObject ret = new JSObject();
            ret.put("uri", uri.toString());
            call.resolve(ret);
        } else {
            call.reject("Выбор файла отменен");
        }
    }

    @PluginMethod
    public void readFile(PluginCall call) {
        String uriString = call.getString("uri");
        if (uriString == null) {
            call.reject("URI отсутствует");
            return;
        }

        try {
            Uri uri = Uri.parse(uriString);
            StringBuilder stringBuilder = new StringBuilder();
            try (InputStream inputStream = getContext().getContentResolver().openInputStream(uri);
                 BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line).append("\n");
                }
                JSObject ret = new JSObject();
                ret.put("content", stringBuilder.toString());
                call.resolve(ret);
            }
        } catch (Exception e) {
            call.reject("Ошибка чтения: " + e.getMessage());
        }
    }

    @PluginMethod
    public void writeFile(PluginCall call) {
        String uriString = call.getString("uri");
        String content = call.getString("content");

        if (uriString == null || content == null) {
            call.reject("URI или контент отсутствуют");
            return;
        }

        try {
            Uri uri = Uri.parse(uriString);
            try (OutputStream outputStream = getContext().getContentResolver().openOutputStream(uri, "wt")) {
                outputStream.write(content.getBytes(StandardCharsets.UTF_8));
                call.resolve();
            }
        } catch (Exception e) {
            call.reject("Ошибка записи: " + e.getMessage());
        }
    }
}
