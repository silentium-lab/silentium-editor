package pw.silentium.editor;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import pw.silentium.editor.SAFPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(SAFPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
